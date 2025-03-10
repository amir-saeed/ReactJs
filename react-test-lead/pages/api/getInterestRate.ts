import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const rate = await fetchFromBankOfEngland();
    res.status(200).json({ interestRate: rate });
  } catch (error: any) {
    console.error("Interest rate fetch error:", error.message);
    try {
      const fallbackRate = 4.5;
      res.status(200).json({ 
        interestRate: fallbackRate,
        source: 'fallback',
        message: 'Using fallback mortgage rate due to API error' 
      });
    } catch (fallbackError) {
      res.status(500).json({ error: 'Failed to retrieve mortgage rate data' });
    }
  }
}

async function fetchFromBankOfEngland(): Promise<number> {
  const seriesCode = "IUMTLMV";
  
  const today = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(today.getMonth() - 1);
  
  const dateFrom = formatDateForBoE(threeMonthsAgo);
  const dateTo = formatDateForBoE(today);

  console.log("Fetching from BoE:dateFrom", dateFrom);
  console.log("Fetching from BoE:dateTo", dateTo);
  
  const url = `https://www.bankofengland.co.uk/boeapps/iadb/fromshowcolumns.asp?csv.x=yes&Datefrom=${dateFrom}&Dateto=${dateTo}&SeriesCodes=IUMABEDR&CSVF=TN&UsingCodes=Y&VPD=Y&VFD=N`;
  
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible)',
      'Accept': 'text/csv,*/*',
    },
  });

  if (!response.ok) {
    throw new Error(`Bank of England API returned status: ${response.status}`);
  }

  const text = await response.text();
  
  if (text.includes('ErrorPage') || !text.includes(',')) {
    throw new Error('Invalid response format from Bank of England');
  }

  const lines = text.trim().split('\n').filter(line => line.trim().length > 0);
  
  if (lines.length < 2) {
    throw new Error('No data rows found in response');
  }

  for (let i = lines.length - 1; i >= 1; i--) {
    const columns = lines[i].split(',');
    
    if (columns.length >= 2) {
      const rateString = columns[1].trim().replace(/[^0-9.]/g, '');
      const rate = parseFloat(rateString);
      
      if (!isNaN(rate)) {
        return rate;
      }
    }
  }

  throw new Error('Could not find a valid interest rate in the response');
}

function formatDateForBoE(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
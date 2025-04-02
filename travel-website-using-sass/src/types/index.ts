export interface Destination {
    id: number;
    title: string;
    location: string;
    description: string;
    image: string;
    price: number;
    rating: number;
    duration: string;
  }
  
  export interface Testimonial {
    id: number;
    name: string;
    location: string;
    quote: string;
    avatar: string;
  }
  
  export interface NavItem {
    id: number;
    title: string;
    path: string;
  }
  
  export interface FooterLink {
    id: number;
    title: string;
    path: string;
  }
  
  export interface FooterColumn {
    id: number;
    title: string;
    links: FooterLink[];
  }
  
  export interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    onClick?: () => void;
    href?: string;
  }
  
  export interface CardProps {
    destination: Destination;
  }
  
  export interface ContainerProps {
    children: React.ReactNode;
    className?: string;
  }
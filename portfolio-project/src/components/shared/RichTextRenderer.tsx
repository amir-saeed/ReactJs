import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { INLINES, Document } from "@contentful/rich-text-types";

interface RichTextRendererProps {
  document: Document;
}

const RichTextRenderer = ({ document }: RichTextRendererProps) => {
  const options = {
    renderNode: {
      [INLINES.HYPERLINK]: (node: any, children: any) => {
        const { uri } = node.data;
        return (
          <a
            href={uri}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      },
    },
  };

  return <>{documentToReactComponents(document, options)}</>;
};

export default RichTextRenderer;

import React from "react";

interface Background {
  color: string;
  gradient: string;
}

interface Image {
  shortQuery: string;
  fullDescription: string;
  originalUrl: string;
  storedPath: string;
  selectedPath: string;
}

interface TextBlock {
  id: string;
  text: string;
  type: string;
}

interface Content {
  textBlocks: TextBlock[];
  image: Image;
  notes: string;
}

export interface SlideSchema {
  id: string;
  title: string;
  type: string;
  content: Content;
  background: Background;
}

interface Props {
  id: string;
  title: string;
  type: string;
  content: Content;
  background: Background;
}

const Slide = ({ id, title, type, content, background }: Props) => {
  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center p-8"
      style={{ backgroundColor: background?.color || "#FFFFFF" }}
    >
      <div className="max-w-4xl w-full">
        {/* Text Blocks */}
        <div className="mb-6">
          {content.textBlocks?.map((textBlock) => {
            if (!textBlock) return null;

            switch (textBlock.type) {
              case "heading":
                return (
                  <h1
                    key={textBlock.id}
                    className="text-4xl font-bold text-gray-800 mb-4"
                  >
                    {textBlock.text || "Untitled"}
                  </h1>
                );
              case "subheading":
                return (
                  <h2
                    key={textBlock.id}
                    className="text-2xl font-semibold text-gray-700 mb-4"
                  >
                    {textBlock.text || "Subtitle"}
                  </h2>
                );
              case "bullet":
                return (
                  <p
                    key={textBlock.id}
                    className="text-xl text-gray-600 mb-2 before:content-['•'] before:mr-2 before:text-green-600"
                  >
                    {textBlock.text || "Bullet point"}
                  </p>
                );
              case "paragraph":
                return (
                  <p key={textBlock.id} className="text-xl text-gray-600 mb-4">
                    {textBlock.text || "Paragraph text"}
                  </p>
                );
              default:
                return null;
            }
          })}
        </div>

        {/* Speaker Notes */}
        {content.notes && (
          <div className="text-sm text-gray-500 italic mt-4">
            Speaker Notes: {content.notes}
          </div>
        )}
      </div>
    </div>
  );
  //   return (
  //     <>
  //       <ul>
  //         <li>{id}</li>
  //         <li>{title}</li>
  //         <li>{type}</li>
  //         {content.textBlocks.map((textblock) => (
  //           <li>{textblock.text}</li>
  //         ))}
  //         <li>{content.notes}</li>
  //         <li>{content.image.fullDescription}</li>
  //         <li>{background.color}</li>
  //       </ul>
  //     </>
  //   );
};

export default Slide;

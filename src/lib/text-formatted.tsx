interface TextFormattedProps {
  text: string;
  length?: number;
}

const TextFormatted = (props: TextFormattedProps) => {
  const { text, length } = props;

  return (
    <span className="text-nowrap">
      {text.length > (length ? length : 15)
        ? text.substring(0, length ? length : 15) + "..."
        : text}
    </span>
  );
};

export { TextFormatted };

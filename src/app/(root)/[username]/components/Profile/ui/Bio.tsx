type BioProps = {
  bio: string;
};

export const Bio = ({ bio }: BioProps) => (
  <h2 className="text-[13px] mt-1 mb-1 md:text-sm md:mt-0">
    {bio.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < bio.split('\n').length - 1 && <br />}
      </span>
    ))}
  </h2>
);

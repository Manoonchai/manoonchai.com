import { FC } from 'react';

interface Props {
  question: string;
  answer?: string;
}

const Question: FC<Props> = ({ question, answer, children }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold my-4">{question}</h2>
      {answer && <p className="text-gray-400">{answer}</p>}

      {children && children}
    </div>
  );
};

export default Question;

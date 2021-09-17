export default function Question({ question, answer }: { question: string, answer: string }) {
  return <div>
    <h2 className="text-2xl font-bold my-4">{question}</h2>
    <p className="text-gray-400">
      {answer}
    </p>
  </div>
}
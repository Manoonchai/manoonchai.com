const features = [
  {
    icon: '',
    title: '1111111',
    description:
      'Nulla mi ornare suspendisse convallis arcu fames integer turpis torquent elit vehicula erat nibh ante egestas elementum curae, interdum fusce nisl pulvinar nascetur habitant semper justo in sociosqu conubia ut ridiculus porta consequat. Pretium per at dis purus lectus consequat cubilia, morbi lacus porttitor felis massa malesuada volutpat, elementum et nunc vivamus commodo ipsum. Consequat et dapibus hac gravida mi venenatis felis morbi lacinia magna egestas, hendrerit eget conubia elementum vehicula aliquet himenaeos dolor nunc ultricies vel, potenti scelerisque eleifend fringilla etiam ut maecenas erat eros arcu.',
  },
  {
    icon: '',
    title: '22222222222',
    description:
      'Nulla mi ornare suspendisse convallis arcu fames integer turpis torquent elit vehicula erat nibh ante egestas elementum curae, interdum fusce nisl pulvinar nascetur habitant semper justo in sociosqu conubia ut ridiculus porta consequat. Pretium per at dis purus lectus consequat cubilia, morbi lacus porttitor felis massa malesuada volutpat, elementum et nunc vivamus commodo ipsum. Consequat et dapibus hac gravida mi venenatis felis morbi lacinia magna egestas, hendrerit eget conubia elementum vehicula aliquet himenaeos dolor nunc ultricies vel, potenti scelerisque eleifend fringilla etiam ut maecenas erat eros arcu.',
  },
  {
    icon: '',
    title: '3 exchange rates',
    description:
      'Nulla mi ornare suspendisse convallis arcu fames integer turpis torquent elit vehicula erat nibh ante egestas elementum curae, interdum fusce nisl pulvinar nascetur habitant semper justo in sociosqu conubia ut ridiculus porta consequat. Pretium per at dis purus lectus consequat cubilia, morbi lacus porttitor felis massa malesuada volutpat, elementum et nunc vivamus commodo ipsum. Consequat et dapibus hac gravida mi venenatis felis morbi lacinia magna egestas, hendrerit eget conubia elementum vehicula aliquet himenaeos dolor nunc ultricies vel, potenti scelerisque eleifend fringilla etiam ut maecenas erat eros arcu.',
  },
  {
    icon: '',
    title: '4',
    description:
      'Nulla mi ornare suspendisse convallis arcu fames integer turpis torquent elit vehicula erat nibh ante egestas elementum curae, interdum fusce nisl pulvinar nascetur habitant semper justo in sociosqu conubia ut ridiculus porta consequat. Pretium per at dis purus lectus consequat cubilia, morbi lacus porttitor felis massa malesuada volutpat, elementum et nunc vivamus commodo ipsum. Consequat et dapibus hac gravida mi venenatis felis morbi lacinia magna egestas, hendrerit eget conubia elementum vehicula aliquet himenaeos dolor nunc ultricies vel, potenti scelerisque eleifend fringilla etiam ut maecenas erat eros arcu.',
  },
  {
    icon: '',
    title: '5',
    description:
      'Nulla mi ornare suspendisse convallis arcu fames integer turpis torquent elit vehicula erat nibh ante egestas elementum curae, interdum fusce nisl pulvinar nascetur habitant semper justo in sociosqu conubia ut ridiculus porta consequat. Pretium per at dis purus lectus consequat cubilia, morbi lacus porttitor felis massa malesuada volutpat, elementum et nunc vivamus commodo ipsum. Consequat et dapibus hac gravida mi venenatis felis morbi lacinia magna egestas, hendrerit eget conubia elementum vehicula aliquet himenaeos dolor nunc ultricies vel, potenti scelerisque eleifend fringilla etiam ut maecenas erat eros arcu.',
  },
  {
    icon: '',
    title: '6',
    description:
      'Nulla mi ornare suspendisse convallis arcu fames integer turpis torquent elit vehicula erat nibh ante egestas elementum curae, interdum fusce nisl pulvinar nascetur habitant semper justo in sociosqu conubia ut ridiculus porta consequat. Pretium per at dis purus lectus consequat cubilia, morbi lacus porttitor felis massa malesuada volutpat, elementum et nunc vivamus commodo ipsum. Consequat et dapibus hac gravida mi venenatis felis morbi lacinia magna egestas, hendrerit eget conubia elementum vehicula aliquet himenaeos dolor nunc ultricies vel, potenti scelerisque eleifend fringilla etiam ut maecenas erat eros arcu.',
  },
];

export default function Features() {
  return (
    <div className="mt-10 px-10">
      <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
        {features.map(({ title, description }, idx) => (
          <div className="relative" key={idx}>
            <dt>
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                {/* <!-- Heroicon name: outline/globe-alt --> */}
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                {title}
              </p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              {description}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

import React from "react";

function SummaryDataCards({
  title,
  amount,
  borderBColor,
  borderLColor,
  icons: Icon, 
  isAmount,
}) {
  return (
    <div
      className={`flex flex-wrap flex-row-reverse items-start justify-between border border-b-4 ${borderBColor} rounded-lg gap-x-4 gap-y-2 px-4 py-5 sm:px-6 xl:px-4`}
    >
      <div>
        <Icon className="text-4xl" /> 
      </div>
      <div>
        <dt
          className={`text-sm font-medium leading-6 text-gray-500 border-l-4 ${borderLColor} pl-4`}
        >
          {title}
        </dt>
        <dd className="w-full mt-1 ml-2 flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
          {isAmount ? (
            <>
              TK <span>{amount}</span>
            </>
          ) : (
            <p>
              <span>{amount}</span>
            </p>
          )}
        </dd>
      </div>
    </div>
  );
}

export default SummaryDataCards;

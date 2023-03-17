import React, { useState, useEffect } from "react";
import { IFetchedVocabularySets } from "../interfaces/props";

const edit: React.FC = () => {
  const [vocabList, setVocabList] = useState<IFetchedVocabularySets | null>(null);

  useEffect(() => {
    const fetchVocabList = async () => {
      const response = await fetch("http://localhost:3000/sets/getAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") as string
        }
      });
      const data = await response.json();
      setVocabList(data.fetchedVocabularySets);
    };
    fetchVocabList();
  }, []);

  return (
    <div className="p-4">
      {vocabList &&
        vocabList.items.map((set: any) => {
          return (
            <div key={set.key} className="border rounded-lg p-4 mb-4">
              <h2 className="text-2xl font-bold">{set.title}</h2>
              <p className="text-gray-600 text-sm mb-2">Number of Words: {set.terms.length}</p>
              <p className="text-gray-600 text-sm mb-2">Creator: {set.creator}</p>
              <p className="text-lg mb-2">Terms: {set.terms.join(", ")}</p>
              <p className="text-lg mb-2">Definitions: {set.definitions.join(", ")}</p>
            </div>
          );
        })}
    </div>
  );
};

export default edit;


"use client";

import { useProcessStore } from "@/store/processStore";
import { FaSpinner } from "react-icons/fa"; // Spinner icon (could also use a CSS animation)
import './pts.css';

export function ProcessToasts() {
  const { processes, removeProcess, updateProcessStatus } = useProcessStore();


  return (
    <div className="processToastWrapper fixed bottom-4 rounded-lg right-4 flex flex-col gap-3 z-50">
      {processes.map((process) => (
        <div
          key={process.id}
          className="processToastItem shadow-md rounded-lg px-4 py-3 min-w-[250px]"
        >
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-800">{process.description}</p>
            
            <button
              onClick={() => {
                if (process.status === 'completed') {
                  removeProcess(process.id);
                }
              }}
              disabled={process.status === 'running'} // Disable when running
              className={`${
                process.status === 'running' ? 'text-gray-500' : 'text-gray-400 hover:text-gray-600'
              } ml-3`}
            >
              {process.status === 'running' ? (
                <FaSpinner className="animate-spin" color="#0298d8" />
              ) : (
                '✖'
              )}
            </button>
          </div>
          {/* Display message based on success or failure */}
          {process.status === 'completed' && (
            <p className={`text-xs text-green-600`}>
              successful
            </p>
          )}
          {process.status === 'failed' && (
            <p className={`text-xs text-red-600`}>
              failed
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

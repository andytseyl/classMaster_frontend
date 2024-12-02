"use client";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Loading from "@/app/components/Loading";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HONG_KONG_TIMEZONE = "Asia/Hong_Kong";

const useHongKongTime = (date) => {
  return new Date(
    new Date(date).toLocaleString("en-US", { timeZone: HONG_KONG_TIMEZONE })
  );
};

export default function Calendar() {
  const [calendarData, setCalendarData] = useState({});
  const [selectedDate, setSelectedDate] = useState(useHongKongTime(new Date()));
  const [currentMonth, setCurrentMonth] = useState(useHongKongTime(new Date()));
  const [participant, setParticipant] = useState(null);
  const [session_id, setSession_id] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCalendarData();
  }, []);

  async function fetchCalendarData() {
    setIsLoading(true);
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/get-calendar-data`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await result.json();
      if (!result.ok) {
        setErrorMsg("Sorry Please Check Calendar Later");
      } else {
        setCalendarData(data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchParticipant = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/get-participant-by-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId: session_id }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch session info");
    }
    const data = await response.json();
    setParticipant(data);
  };

  useEffect(() => {
    if (session_id) {
      fetchParticipant();
    }
  }, [session_id]);

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = useHongKongTime(new Date(year, month, 1));
    const lastDay = useHongKongTime(new Date(year, month + 1, 0));
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(useHongKongTime(new Date(year, month, i)));
    }
    return days;
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-CA", { timeZone: HONG_KONG_TIMEZONE });
  };

  // Check if a date has events
  const hasEvents = (date) => {
    if (!date) return false;
    const formattedDate = formatDate(date);
    return (
      calendarData[formattedDate] &&
      calendarData[formattedDate].sessions &&
      Object.keys(calendarData[formattedDate].sessions).length > 0
    );
  };

  // Get number of events for a date
  const getEventCount = (date) => {
    if (!date) return 0;
    const formattedDate = formatDate(date);
    if (!calendarData[formattedDate] || !calendarData[formattedDate].sessions)
      return 0;
    return Object.keys(calendarData[formattedDate].sessions).length;
  };

  const getPrograms = (date) => {
    const formattedDate = formatDate(date);
    if (calendarData[formattedDate] && calendarData[formattedDate].sessions) {
      return Object.values(calendarData[formattedDate].sessions);
    }
    return [];
  };

  const token = localStorage.getItem("token");
  if (!token) {
    alert("No authorization token found.");
    return null;
  }

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="container mx-auto p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="card bg-base-100 lg:w-[40%] shadow-xl">
              <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                  <button
                    className="btn btn-ghost"
                    onClick={() =>
                      setCurrentMonth(
                        new Date(
                          currentMonth.setMonth(currentMonth.getMonth() - 1)
                        )
                      )
                    }
                  >
                    ←
                  </button>
                  <h2 className="card-title">
                    {currentMonth.toLocaleDateString("zh-TW", {
                      year: "numeric",
                      month: "long",
                    })}
                  </h2>
                  <button
                    className="btn btn-ghost"
                    onClick={() =>
                      setCurrentMonth(
                        new Date(
                          currentMonth.setMonth(currentMonth.getMonth() + 1)
                        )
                      )
                    }
                  >
                    →
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div key={day} className="font-bold p-2">
                        {day}
                      </div>
                    )
                  )}
                  {generateCalendarDays().map((date, index) => (
                    <div
                      key={index}
                      className={`relative p-2 cursor-pointer hover:bg-base-200 rounded-lg 
                    ${
                      date && formatDate(date) === formatDate(selectedDate)
                        ? "bg-primary text-primary-content"
                        : ""
                    }
                    ${!date ? "cursor-default" : ""}
                    ${hasEvents(date) ? "font-semibold" : ""}
                  `}
                      onClick={() => date && setSelectedDate(date)}
                    >
                      {date ? (
                        <>
                          <span>{date.getDate()}</span>
                          {hasEvents(date) && (
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                              <div
                                className={`w-1.5 h-1.5 rounded-full ${
                                  formatDate(date) === formatDate(selectedDate)
                                    ? "bg-primary-content"
                                    : "bg-primary"
                                }`}
                              ></div>
                            </div>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 lg:w-[60%] lg:h-[100%]">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title flex justify-between items-center">
                    <span>{formatDate(selectedDate)}</span>
                    {hasEvents(selectedDate) && (
                      <span className="badge badge-primary">
                        {getEventCount(selectedDate)} Events
                      </span>
                    )}
                  </h2>
                  <div className="divider"></div>
                  <div className="overflow-y-auto max-h-[600px]">
                    {!hasEvents(selectedDate) ? (
                      <div className="text-center py-4 opacity-70">
                        No Programs for this date
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {getPrograms(selectedDate).map((program) => (
                          <div
                            key={program.session_id}
                            className="collapse collapse-arrow bg-base-200"
                          >
                            <input
                              type="radio"
                              name="program-accordion"
                              onChange={() => setSession_id(program.session_id)}
                            />
                            <div className="collapse-title">
                              <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-row items-center">
                                  <p className="font-base">
                                    {program.session_startTime}
                                  </p>
                                  <h3 className="font-base ml-5">
                                    {program.program_name}
                                  </h3>
                                </div>
                                <div className="flex flex-row items-center">
                                  <p className="badge badge-neutral py-3">
                                    {program.lesson_duration / 60 > 1
                                      ? `${program.lesson_duration / 60} hours`
                                      : `${program.lesson_duration / 60} hour`}
                                  </p>
                                  <p className="badge badge-primary ml-3 py-3">
                                    {program.count} PPL
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="collapse-content">
                              <div className="flex flex-row mb-3">
                                <p className="flex-none w-14 font-semibold">
                                  #
                                </p>
                                <p className="flex-1 font-semibold">Name</p>
                                <p className="flex-1 font-semibold">
                                  Contract Number
                                </p>
                              </div>
                              {participant &&
                                participant.map((el, i) => (
                                  <div
                                    key={i}
                                    className="flex flex-row mb-3 text-sm"
                                  >
                                    <p className="flex-none w-14">{i + 1}</p>
                                    <p className="flex-1">
                                      {el.participant_name}
                                    </p>
                                    <p className="flex-1">
                                      {el.telephone_no || ""}
                                    </p>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import SelectBox from "../components/SelectBox";
import NavBar from "../components/NavBar";

const WorkerInterviewPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const state: any = useSelector((state) => state);
  const [basic, setBasic] = useState<any>({});
  const [times, setTimes] = useState<any>([]);
  const worker_id = sessionStorage.getItem("worker_id");

  const getDate = (date: string) => {
    setDate(date);
  };
  const getTime = (time: string) => {
    setTime(time);
  };
  const getQuestion = (e: any) => {
    setQuestion(e.target.value);
  };

  const onComplete = () => {
    onApply();
    // navigate("/worker/nearWork");
    navigate("/worker/mypage");
  };

  const getData = async () => {
    await axios
      .post("http://localhost:4000/apply/load_store", {
        store_id: Number(state.store.id),
      })
      .then((res) => {
        // console.log(">>>>>>>", res.data);
        setBasic(res.data);
      });
  };

  const getData2 = async () => {
    await axios
      .post("http://localhost:4000/apply/load_interview", {
        store_id: Number(state.store.id),
        interview_month: 7,
      })
      .then((res) => {
        // console.log("!!!!!!!!!!!",res)
        setTimes(res.data);
      });
  };

  const onApply = async () => {
    await axios
      .post("http://localhost:4000/apply/submit", {
        interview_date: date,
        interview_time: Number(time),
        question: question,
        worker_id: worker_id,
        store_id: Number(state.store.id),
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  useEffect(() => {
    getData();
    getData2();
  }, []);

  return (
    <div className="my-2">
      {/* ?????? */}
      <NavBar />
      <Header title={"????????????"} />
      {/* ????????? */}
      <div className="bg-gray-200 w-full h-48"></div>
      {/* ?????? */}
      <p className="px-8 py-4"></p>
      <div className="border-t-4 "></div>
      {/* ?????? ?????? ?????? : ?????????, ?????????, ?????????, ?????? */}
      <div className="mx-8 m-4 text-sm">
        <h3 className="font-bold mb-4 text-base">{basic && basic.name}</h3>
        <div className="flex items-center mb-3 text-gray-500">
          <p className="flex-1">?????????</p>
          <p className="flex-3">
            <span className="text-sm">{basic && basic.owner_name}???</span>
          </p>
        </div>
        <div className="flex items-center mb-3 text-gray-500">
          <p className="flex-1">?????????</p>
          <p className="flex-3">{basic && basic.owner_phone}</p>
        </div>
        <div className="flex items-center mb-3 text-gray-500">
          <p className="flex-1">??????</p>
          <p className="flex-3">{basic && basic.address}</p>
        </div>
      </div>
      <div className="border-t-4 "></div>
      {/* ???????????? */}
      <div className="mx-8 m-4">
        <h3 className="font-bold mb-4">?????? ??????</h3>
        <SelectBox
          mode="NORMAL"
          getData={getDate}
          data={
            times &&
            times.map((t: any) => {
              return t.date;
            })
          }
          selectedDay={date}
        />
      </div>
      <div className="border-t-4 "></div>
      {/* ???????????? */}
      <div className="mx-8 m-4">
        <h3 className="font-bold mb-4">?????? ??????</h3>
        <SelectBox
          mode="TIME"
          getData={getTime}
          data={
            date === null
              ? [
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 19, 20,
                  21, 22, 23,
                ]
              : times.filter((t: any) => t.date === date)[0].time
          }
          selectedTime={time}
        />
      </div>
      <div className="border-t-4 "></div>
      {/* ???????????? */}
      <div className="mx-8 m-4">
        <h3 className="font-bold mb-4">?????? ??????</h3>
        {["?????????", "??????", "?????????"].map((e) => {
          return (
            <button
              key={e}
              className="bg-gray-200 rounded-2xl p-1 px-4 cursor-pointer mr-2"
            >
              {e}
            </button>
          );
        })}
      </div>
      <div className="border-t-4 "></div>
      {/* ???????????? */}
      <div className="mx-8 m-4">
        <h3 className="font-bold mb-4">?????? ??????</h3>
        <p className="text-gray-500 text-sm mb-2">
          ???????????? ????????? ????????? ???????????????
        </p>
        <input
          type="text"
          placeholder="????????? ??????????????????"
          className="bg-gray-100 w-full h-10 pl-2"
          value={question}
          onChange={getQuestion}
        />
      </div>
      <div className="border-t-4 "></div>
      {/* ????????????*/}
      <div className="mx-8 m-4">
        <h3 className="font-bold mb-4">????????????</h3>
        <div className="flex items-center mb-3 text-gray-500">
          <p className="flex-1">????????????</p>
          <p className="flex-3">
            {date?.split("-")[0] === undefined
              ? "????????? ??????????????????"
              : `${date?.split("-")[0]}??? ${date?.split("-")[1]}??? ${
                  date?.split("-")[2]
                }??? `}
          </p>
        </div>
        <div className="flex items-center mb-3 text-gray-500">
          <p className="flex-1">????????????</p>
          <p className="flex-3">{`${time === null ? "00" : time}:00 ~ ${
            time === null ? "00" : Number(time) + 1
          }:00`}</p>
        </div>
      </div>
      <div className="border-t-4 "></div>
      {/* ???????????? */}
      <div className="mx-8 m-4">
        <h3 className="font-bold mb-4">????????????</h3>
        {[
          "- ????????? ???????????? ???????????????.",
          " - ?????? ????????? ???????????? ????????? ????????? ??? ????????????.",
          " - ?????? 30??? ????????? ???????????? ????????? ??????????????????.",
          " - ?????? 24?????? ????????? ????????? ???????????????.",
          " - ?????? ?????? ????????? ????????? ????????? ???????????????.",
        ].map((e) => {
          return (
            <p key={e} className="text-sm mb-2 text-gray-500">
              {e}
            </p>
          );
        })}
        <div className="h-3"></div>

        <Button title={"????????????"} onClickEvent={onComplete} />
      </div>
    </div>
  );
};

export default WorkerInterviewPage;

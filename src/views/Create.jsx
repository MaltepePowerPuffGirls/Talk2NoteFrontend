import React, { useEffect, useState } from "react";
import { FaMicrophone, FaStar } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-kit";

const Create = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result ?? result.join(''))
    },
  });

  useEffect(()=>{
    console.log(value)
  }, [value])

  const onListen = () => {
    listen({ lang: 'en-US', continuous: true });
  };

  return (
    <div className="px-12 mt-5 flex flex-col gap-5 text-white pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-6">
          <IoMdArrowBack
            onClick={() => navigate("/notes")}
            className="w-[2em] h-[2em] cursor-pointer"
          />
          <h2 className="text-2xl font-bold">NOTE NAME</h2>
        </div>
        <button
          className="rounded-[15px] text-white py-2 px-6 font-semibold text-lg flex items-center justify-center gap-2"
          style={{
            background:
              "linear-gradient(to top right, #FDC830 7%, #F37335 94%)",
          }}
        >
          Favorite
          <FaStar />
        </button>
      </div>
      <div className="relative">
        <h2 className="text-[#909090] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 font-bold text-3xl">
          {listening ? value.length < 1 ? "Go ahead we're listening" : "" : "Start recording..."}
        </h2>
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="w-full h-64 border border-white rounded flex items-center relative justify-center bg-transparent focus:outline-none resize-none"
          disabled
        />
        <div
          className="mic-icon cursor-pointer absolute -bottom-[32px] left-1/2 -translate-x-1/2 rounded-full w-16 h-16 flex items-center justify-center"
          onClick={!listening ? onListen : stop}
          style={{
            background:
              "linear-gradient(to top right, #F4C4F3 7%, #FC67FA 94%)",
          }}
        >
          <FaMicrophone className="text-[#9900B1] w-[2.5em] h-[2.5em]" />
        </div>
        <div className="absolute bottom-0 right-3">{value.length}/5000</div>
      </div>

      <div className="w-full h-64 border border-white rounded flex flex-col justify-start relative  px-12 py-5 mt-8">
        <h2 className="font-bold text-xl">Block Note 1</h2>
        <p className="mt-5">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat ut
          nesciunt a quam nisi ipsum expedita mollitia, sapiente molestiae,
          totam suscipit pariatur perferendis quos eveniet id, veritatis
          architecto hic culpa. Magni, aliquam nostrum. Quod, repellat
          cupiditate! Sequi, at pariatur ea, deleniti, adipisci non ducimus
          cupiditate nam error itaque eos accusantium. Reprehenderit sit alias
          illo quibusdam nostrum itaque quos dignissimos natus. Ratione officiis
          cum dolores accusamus architecto nemo fuga sed voluptas? Illum
          voluptates eius quisquam sunt laborum accusamus, expedita corporis
          aspernatur, neque error quasi dolor excepturi ratione ullam
          necessitatibus repellat maxime? Deleniti autem magni laudantium, earum
          possimus, libero alias dolor minus error dolores veniam, maiores sunt
          tenetur ad. Mollitia quibusdam quisquam esse quis consequatur
          reiciendis ducimus cumque neque quod pariatur. Eius.
        </p>
      </div>
      <div className="w-full h-64 border border-white rounded flex flex-col justify-start relative  px-12 py-5 mt-8">
        <h2 className="font-bold text-xl">Block Note 2</h2>
        <p className="mt-5">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat ut
          nesciunt a quam nisi ipsum expedita mollitia, sapiente molestiae,
          totam suscipit pariatur perferendis quos eveniet id, veritatis
          architecto hic culpa. Magni, aliquam nostrum. Quod, repellat
          cupiditate! Sequi, at pariatur ea, deleniti, adipisci non ducimus
          cupiditate nam error itaque eos accusantium. Reprehenderit sit alias
          illo quibusdam nostrum itaque quos dignissimos natus. Ratione officiis
          cum dolores accusamus architecto nemo fuga sed voluptas? Illum
          voluptates eius quisquam sunt laborum accusamus, expedita corporis
          aspernatur, neque error quasi dolor excepturi ratione ullam
          necessitatibus repellat maxime? Deleniti autem magni laudantium, earum
          possimus, libero alias dolor minus error dolores veniam, maiores sunt
          tenetur ad. Mollitia quibusdam quisquam esse quis consequatur
          reiciendis ducimus cumque neque quod pariatur. Eius.
        </p>
      </div>
      <div className="w-full h-64 border border-white rounded flex flex-col justify-start relative  px-12 py-5 mt-8">
        <h2 className="font-bold text-xl">Block Note 3</h2>
        <p className="mt-5">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat ut
          nesciunt a quam nisi ipsum expedita mollitia, sapiente molestiae,
          totam suscipit pariatur perferendis quos eveniet id, veritatis
          architecto hic culpa. Magni, aliquam nostrum. Quod, repellat
          cupiditate! Sequi, at pariatur ea, deleniti, adipisci non ducimus
          cupiditate nam error itaque eos accusantium. Reprehenderit sit alias
          illo quibusdam nostrum itaque quos dignissimos natus. Ratione officiis
          cum dolores accusamus architecto nemo fuga sed voluptas? Illum
          voluptates eius quisquam sunt laborum accusamus, expedita corporis
          aspernatur, neque error quasi dolor excepturi ratione ullam
          necessitatibus repellat maxime? Deleniti autem magni laudantium, earum
          possimus, libero alias dolor minus error dolores veniam, maiores sunt
          tenetur ad. Mollitia quibusdam quisquam esse quis consequatur
          reiciendis ducimus cumque neque quod pariatur. Eius.
        </p>
      </div>
    </div>
  );
};

export default Create;
import { TiTick } from "react-icons/ti";


const footballPredictions = [
  {
    homeTeam: "Liverpool",
    awayTeam: "Manchester United",
    date: "2025-02-12",
    prediction: "Home",
    result: "Home",
    score: {
      home: "3",
      away: "1"
    }
  },
  {
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    date: "2025-02-13",
    prediction: "Draw",
    result: "Draw",
    score: {
      home: "1",
      away: "1"
    }
  },
  {
    homeTeam: "Barcelona",
    awayTeam: "Real Madrid",
    date: "2025-02-14",
    prediction: "Away",
    result: "Away",
    score: {
      home: "0",
      away: "2"
    }
  },
  {
    homeTeam: "Juventus",
    awayTeam: "AC Milan",
    date: "2025-02-15",
    prediction: "Home",
    result: "Home",
    score: {
      home: "2",
      away: "1"
    }
  },
  {
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    date: "2025-02-16",
    prediction: "Home",
    result: "Away",
    score: {
      home: "1",
      away: "2"
    }
  }
];



const OurWinsCarousel = () => {
  return (
<div className="w-[90%] mx-auto mt-35">
      <div className="flex overflow-auto gap-10 animate-infinite-scroll">
        {[...footballPredictions,...footballPredictions].filter(prediction => prediction.prediction === prediction.result).map((prediction, index) => (
          <div
            key={prediction.date+index}
            className="flex-none w-80 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-center items-center gap-5 h-10">
              <h3 className="text-l font-semibold">{`${prediction.homeTeam}`}</h3>
              <div className="flex justify-center items-center bg-green-600 px-1 rounded-sm text-slate-50">
                <span>{`${prediction.score.home}`} </span>
                <span>-</span>
                <span>{`${prediction.score.home}`}</span>
              </div>
              <h3 className="text-l font-semibold">{`${prediction.awayTeam}`}</h3>
            </div>
            <p className="mt-1 text-gray-800">Prediction: <span className="font-bold text-green-500">{prediction.prediction}</span></p>
            <div className="flex justify-between items-center">
              <p className="mt-1 text-sm text-gray-600">{prediction.date}</p>
              <p className="flex justify-center items-center gap-1 text-sm font-bold mt-1 text-gray-600"><span className="bg-green-500 rounded-full text-white"><TiTick/></span>{prediction.result}</p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurWinsCarousel

interface ScheduleItem {
  time: string;
  title: string;
  description?: string;
}

interface ScheduleDay {
  day: number;
  title: string;
  items: ScheduleItem[];
}

const Schedule = ({ schedule }: { schedule: ScheduleDay[] }) => {
  return (
    <div className="relative mt-12">
      <div className="absolute top-0 left-9 h-full w-0.5 bg-zinc-700" />
      <div className="space-y-12">
        {schedule.map((day) => (
          <div key={day.day} className="relative pl-9">
            <div className="absolute top-1 left-0 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-white">
              {day.day}
            </div>
            <div className="pl-8">
              <h3 className="text-xl font-bold text-white font-montserrat">{day.title}</h3>
              <div className="mt-4 space-y-4">
                {day.items.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="w-24 text-zinc-400">{item.time}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{item.title}</p>
                      {item.description && <p className="text-zinc-400">{item.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;

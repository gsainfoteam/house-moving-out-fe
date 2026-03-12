import { cn } from '@/common/utils';

import { useConverterForm } from '../../viewmodels';

export function ConverterFrame() {
  const { onChange, data, download } = useConverterForm();
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-2">
        <input
          className="rounded-lg border px-4 py-2"
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={onChange}
        />
        {data && (
          <button className="rounded-lg border px-4 py-2" onClick={download}>
            download
          </button>
        )}
      </div>
      {data ? (
        <div className="overflow-x-scroll">
          <div className="flex flex-col gap-4">
            {data.flatMap((building) => {
              const isGorI = ['G', 'I'].includes(building.building);
              return (
                <div className="flex gap-4">
                  {building.floors.flatMap((floor, index) => {
                    const higher = index >= 2;
                    return (
                      <div key={floor.tag}>
                        <table
                          className={cn(
                            'border-icon-light-gray border-collapse border',
                            '[&_th,&_td]:border [&_th,&_td]:border-gray-200 [&_th,&_td]:px-3 [&_th,&_td]:py-2',
                            'text-center',
                            higher ? 'w-160' : 'w-132',
                          )}
                        >
                          <thead>
                            <tr>
                              <th colSpan={100} className="bg-gray-200">
                                {floor.tag}
                              </th>
                            </tr>
                            <tr className="[&_th]:w-18">
                              <th>호실</th>
                              <th>이름</th>
                              <th>학번</th>
                              <th>이름</th>
                              <th>학번</th>
                              {higher &&
                                (isGorI ? (
                                  <>
                                    <th>이름</th>
                                    <th>학번</th>
                                  </>
                                ) : (
                                  <>
                                    <th />
                                    <th />
                                  </>
                                ))}
                            </tr>
                          </thead>
                          <tbody>
                            {floor.rooms.map((room) => (
                              <tr key={room.room}>
                                <td>{room.room}</td>
                                <td>{room.residents[0]?.name}</td>
                                <td>{room.residents[0]?.studentId}</td>
                                <td>{room.residents[1]?.name}</td>
                                <td>{room.residents[1]?.studentId}</td>
                                {higher && (
                                  <>
                                    <td>{room.residents[2]?.name}</td>
                                    <td>{room.residents[2]?.studentId}</td>
                                  </>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>no data</>
      )}
    </div>
  );
}

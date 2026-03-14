import React, { useRef } from 'react';

import { maxBy, range } from 'es-toolkit';

import { cn } from '@/common/utils';

import { useConverterForm } from '../../viewmodels';

export function ConverterFrame() {
  const { onChange, data, download } = useConverterForm();
  const tableRef = useRef<HTMLTableElement>(null);
  return (
    <div className="flex max-h-screen flex-col gap-4 p-4">
      <div>Data never be sent to server.</div>
      <div className="flex gap-2">
        <input
          className="rounded-lg border px-4 py-2"
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={onChange}
        />
        {data && (
          <button className="rounded-lg border px-4 py-2" onClick={() => download(tableRef)}>
            download
          </button>
        )}
      </div>
      {data ? (
        <div className="overflow-scroll rounded-lg border p-2">
          <table
            ref={tableRef}
            className={cn(
              'border-collapse text-center whitespace-nowrap',
              '[&_th,&_td]:border [&_th,&_td]:border-gray-200 [&_th,&_td]:px-3 [&_th,&_td]:py-2',
            )}
          >
            <tbody>
              {data.map((building, buildingIndex) => {
                const isGorI = ['G', 'I'].includes(building.building);
                const maxFloor = maxBy(building.floors, (floor) => floor.rooms.length);
                const maxRoomCount = maxFloor?.rooms.length ?? 0;
                return (
                  <React.Fragment key={building.building}>
                    {buildingIndex !== 0 && (
                      <tr>
                        {range(43).map((i) => (
                          <td key={i} />
                        ))}
                      </tr>
                    )}
                    <tr>
                      {building.floors.map((floor, index) => {
                        const higher = index >= 2;
                        return (
                          <React.Fragment key={floor.tag}>
                            <td colSpan={higher ? 7 : 5} className="bg-gray-200">
                              {floor.tag}
                            </td>
                            {index < 5 && <td />}
                          </React.Fragment>
                        );
                      })}
                    </tr>
                    <tr>
                      {building.floors.map((floor, index) => {
                        const higher = index >= 2;
                        return (
                          <React.Fragment key={floor.tag}>
                            <td>호실</td>
                            {range(higher ? 3 : 2).map((i) => (
                              <React.Fragment key={i}>
                                {isGorI || i < 2 ? <td>이름</td> : <td />}
                                {isGorI || i < 2 ? <td>학번</td> : <td />}
                              </React.Fragment>
                            ))}
                            {index < 5 && <td />}
                          </React.Fragment>
                        );
                      })}
                    </tr>
                    {range(maxRoomCount).map((roomIndex) => (
                      <tr key={roomIndex}>
                        {building.floors.map(({ tag, rooms }, index) => {
                          const higher = index >= 2;
                          const room = rooms[roomIndex];
                          return (
                            <React.Fragment key={tag}>
                              <td>{room?.room}</td>
                              {range(higher ? 3 : 2).map((i) => (
                                <React.Fragment key={i}>
                                  <td>{room?.residents[i]?.name}</td>
                                  <td>{room?.residents[i]?.admissionYear}</td>
                                </React.Fragment>
                              ))}
                              {index < 5 && <td />}
                            </React.Fragment>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <>no data</>
      )}
    </div>
  );
}

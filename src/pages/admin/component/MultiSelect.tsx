import { useEffect, useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import BeerInterface from "../../../entity/BeerInterface";
import BrewerieInterface from "../../../entity/BrewerieInterface";

interface MultiSelectProps<T> {
  sendId: (id: number | undefined) => void;
  service: new () => { findAll: () => Promise<T[]> };
  label: string;
}

export default function MultiSelect<
  T extends BrewerieInterface | BeerInterface
>({ sendId: sendId, service, label }: MultiSelectProps<T>) {
  const [selectedObject, setSelectedObject] = useState<T>();

  const [objects, setObjects] = useState<T[]>();
  const [instanceService] = useState(new service());

  useEffect(() => {
    instanceService.findAll().then((data) => {
      setObjects(data);
    });
  }, [instanceService, service]);
  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={selectedObject}
        onChange={(e: DropdownChangeEvent) => {
          sendId(e.value.id_brewerie);
          setSelectedObject(e.value);
          console.log(e.value.id_brewerie);
        }}
        options={objects}
        optionLabel="name"
        editable
        placeholder={label}
        className="w-full md:w-14rem"
      />
    </div>
  );
}

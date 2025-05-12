import { Section } from "@/components/section";
import RequestTable from "@/components/table/RequestTable";
import { TableTitle } from "@/components/title";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetRequests } from "@/hooks/requests/get-all-requets";
import { useState } from "react";

const SelectOption = [
  { value: "Информация по моему заказу" },
  { value: "Технический вопрос по работе сайта" },
  { value: "Заявка на свободную тему" },
];

const Requests = () => {
  const [selectTopic, setSelectTopic] = useState<string | null>(null);

  const { data, isLoading, error } = useGetRequests(
    selectTopic ? { topicCategory: selectTopic } : undefined
  );

  if (isLoading) {
    return <Section>Loading...</Section>;
  }

  if (error) {
    return <Section>Error: {error.message}</Section>;
  }

  return (
    <Section>
      <div className="flex justify-start gap-10 items-center mb-4">
        <TableTitle>Request Table</TableTitle>
        <div className="flex gap-5">
          <Select
            onValueChange={(value) => {
              setSelectTopic(value === "none" ? null : value);
            }}
            value={selectTopic || "none"}
          >
            <SelectTrigger className="border border-header rounded-md px-3 text-header ring-header focus:ring-header min-w-[250px] text-sm font-semibold">
              <SelectValue placeholder="Выберите тему обращения" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={0} value="none">
                No selected
              </SelectItem>
              {SelectOption.map(({ value }) => (
                <SelectItem
                  key={value}
                  value={value}
                  className="text-header cursor-pointer"
                >
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

    <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
      <RequestTable requestData={data || []} />
    </div>
    </Section>
  );
};

export default Requests;
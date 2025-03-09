import CreateButton from "@/components/create-button/CreateButton";
import { LoadingData } from "@/components/loading";
import { UserModal } from "@/components/modal";
import { Section } from "@/components/section";
import { UserTable } from "@/components/table";
import { TableTitle } from "@/components/title";
import { useGetUsers } from "@/hooks";
import { User, UsersProps } from "@/types";
import { useState } from "react";

const UsersPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableElement, setTableElement] = useState({});
  const handleOpen = (element?: User) => {
    setTableElement(element || {});
    setIsOpen(!isOpen);
  };
  const { data = {} as UsersProps, isLoading, error } = useGetUsers();
  const userData = data.data || [];
  console.log(userData);
  

  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>User Table</TableTitle>
        <CreateButton onClick={() => handleOpen()}>Create User</CreateButton>
      </div>
      {isLoading ? (
        <LoadingData className="w-full flex justify-center mt-2" />
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
          {userData?.length > 0 ? (
            <UserTable userData={userData} handleOpen={handleOpen} />
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>No subcatalogs found for this catalog</p>
              <CreateButton onClick={() => handleOpen()} className="mt-3">
                Create Subcatalog
              </CreateButton>
            </div>
          )}
        </div>
      )}
      <UserModal
        isOpen={isOpen}
        handleOpen={handleOpen}
        element={tableElement}
      />
    </Section>
  );
};

export default UsersPage;

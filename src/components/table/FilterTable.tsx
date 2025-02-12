// import classNames from "classnames";
// import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
// import { Edit, MoreHorizontal, Trash2Icon } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { useCurrentColor } from "@/hooks";
// import { Button } from "../ui/button";
// import { FilterResponse } from "@/types";

// interface Props {
//   filterData: FilterResponse[];
//   handleOpen: (item: Filter) => void;
// }

// export const FilterTable = ({ filterData, handleOpen }: Props) => {
//   const theme = useCurrentColor();

//   const dataArray = Array.isArray(filterData) ? filterData : [filterData];

//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead
//             className={classNames(
//               "font-medium text-sm uppercase px-5",
//               theme.text
//             )}
//           >
//             ID
//           </TableHead>
//           <TableHead
//             className={classNames(
//               "font-medium text-sm uppercase px-5",
//               theme.text
//             )}
//           >
//             SubCatalog ID
//           </TableHead>
//           <TableHead
//             className={classNames(
//               "font-medium text-sm uppercase px-5",
//               theme.text
//             )}
//           >
//             Category ID
//           </TableHead>
//           <TableHead
//             className={classNames(
//               "font-medium text-sm uppercase px-5",
//               theme.text
//             )}
//           >
//             Data (Name & Type)
//           </TableHead>
//           <TableHead
//             className={classNames(
//               "font-medium text-sm uppercase px-5 text-right",
//               theme.text
//             )}
//           >
//             Action
//           </TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {dataArray.map((item) => (
//           <TableRow key={item.id}>
//             <TableCell>{item.subcatalogId || "N/A"}</TableCell>

//             <TableCell>{item.categoryId || "N/A"}</TableCell>

//             <TableCell>
//               {Object.entries(item.data || {}).map(([key, value]) => (
//                 <div key={key}>
//                   <span className="font-bold text-blue-600">{key}:</span>
//                   <ul>
//                     {Array.isArray(value) &&
//                       value.map((dataItem, index) => (
//                         <li key={index} className="ml-4 text-gray-700">
//                           <span className="font-semibold">Name:</span>{" "}
//                           {dataItem.name},
//                           <span className="ml-2 font-semibold">Type:</span>{" "}
//                           {dataItem.type}
//                         </li>
//                       ))}
//                   </ul>
//                 </div>
//               ))}
//             </TableCell>
//             <TableCell
//               className={classNames("text-sm px-6 py-1 text-end", theme.text)}
//             >
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" className="h-8 w-8 p-0">
//                     <MoreHorizontal
//                       className={classNames("w-4 h-4", theme.text)}
//                     />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent
//                   align="end"
//                   className={classNames(theme.bg)}
//                 >
//                   <DropdownMenuItem>
//                     <button
//                       onClick={() => handleOpen(item)}
//                       className="w-full flex justify-center items-center"
//                     >
//                       <Edit className="mr-2 w-4 h-4 text-blue-600" />
//                       <span className={`min-w-[47px] ${theme.text}`}>Edit</span>
//                     </button>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem>
//                     <button
//                       className={classNames(
//                         "w-full flex justify-center items-center",
//                         theme.text
//                       )}
//                     >
//                       <Trash2Icon className="mr-2 w-4 h-4 text-red-600" />
//                       Delete
//                     </button>
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default FilterTable;

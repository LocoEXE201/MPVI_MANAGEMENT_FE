import EditCategoryModal from "@/app/(management)/category/components/EditCategoryModal";
import UpdateCategoryModal from "@/app/(management)/category/components/EditCategoryModal";
import UpdateCategoryPageComponent from "@/app/(management)/category/components/EditCategoryModal";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useState } from "react";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["image", "categoryId", "status", "quantity", ""];
interface SortableTableProps {
  categories: any[]; // Adjust type according to your category structure
  search: any;
  selectedUpState: any
  setSearch: (search: string) => void;
  onEditCategory: (categoryId: number) => void;
}

const SortableTable: React.FC<SortableTableProps> = ({
  categories,
  search,
  selectedUpState,
  setSearch,
  onEditCategory,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [searchName, setSearchName] = search
  const [selectUp, setSelectUp] = selectedUpState

  const handleEditCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const handleUpdateCategory = (updatedCategory: any) => {
    // Implement category update logic here (e.g., API call)
    console.log("Updated category:", updatedCategory);
    setSelectedCategoryId(null); // Close modal after update
  };
  return (
    <Card
      className="h-full w-full"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography
              variant="h5"
              color="blue-gray"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Category list
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody
        className="overflow-scroll px-0"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((category: any, index: any) => {
              const isLast = index === categories?.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={category?.categoryId}>
                  <td className={classes}>
                    <div className="flex items-center gap-3 w-1/3">
                    <input onChange={(event) => {
                      if (event.target?.checked) {
                        if (!selectUp.includes(category?.categoryId)) {
                          setSelectUp([...selectUp, category.categoryId])
                        }
                      } else {
                        if (selectUp.includes(category?.categoryId)) {
                          setSelectUp([selectUp.filter((catId: any) => catId != category?.categoryId)])
                        }
                      }
                    }}
                    type="checkbox"
                    />
                      <Avatar
                        src={category?.image}
                        alt={category?.categoryId}
                        size="sm"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          {category?.categoryName}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {category?.categoryId}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={category?.status}
                        // color={online ? "green" : "blue-gray"}
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {category?.quantity}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Edit User">
                      <IconButton
                        variant="text"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        onClick={() => onEditCategory(category.categoryId)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {selectedCategoryId !== null && (
            <EditCategoryModal
              category={categories.find(
                (cat) => cat.categoryId === selectedCategoryId
              )}
              onUpdate={handleUpdateCategory} // Pass onUpdate function to EditCategoryModal
              onClose={() => setSelectedCategoryId(null)}
            />
          )}
        </table>
      </CardBody>
      <CardFooter
        className="flex items-center justify-between border-t border-blue-gray-50 p-4"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
export default SortableTable
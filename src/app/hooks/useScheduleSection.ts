import { useContext, useEffect, useState } from "react";
import { ItemModel } from "../models/ItemModel";
import { useNavigate } from "react-router-dom";
import { ItemService } from "../services/ItemService";
import { useProject } from "./useProject";
import useModal from "./useModal";
import { DateTime } from "luxon";
import { AuthContext } from "../contexts/AuthContext";

const useScheduleSection = () => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [classes, setClasses] = useState<ItemModel[]>([]);
  const [selectedDate, setSelectedDate] = useState(DateTime.now().toISODate()!);
  const authContext = useContext(AuthContext);
  const { isOpen, openModal, closeModal } = useModal();
  const { currentProject } = useProject();
  const itemService = new ItemService();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const searchClasses = await itemService.searchItem({
          query: {
            projectId: currentProject?._id,
            $and: [
              { "fields.common.value": "Schedule" },
              { "fields.custom.value": selectedDate },
            ],
          },
          populateArray: [
            "_id",
            "fields.common.fieldId",
            "fields.custom.fieldId",
            "attachments",
            {
              path: "children",
              select: "_id projectId fields",
              populate: ["fields.common.fieldId", "fields.custom.fieldId"],
            },
            "assignees",
          ],
          select: "_id projectId coverPhoto fields children assignees",
        });

        setClasses(searchClasses as ItemModel[]);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, [currentProject, authContext?.token, selectedDate]);

  const handleMonthChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const newMonth = event.target.value;
    setSelectedMonth(newMonth);
  };

  const handleDaySelect = (day: string) => {
    setSelectedMonth(day.slice(0, 7));
    setSelectedDate(day);
  };

  const handleBookNowClick = (childId: string) => {
    if (authContext?.user) {
      navigate(`/appointment?id=${childId}&step=0`);
    } else {
      openModal();
    }
  };
  return {
    selectedMonth,
    classes,
    isOpen,
    currentMonth,
    closeModal,
    handleMonthChange,
    handleDaySelect,
    handleBookNowClick,
  };
};

export default useScheduleSection;

import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";
import { BsThreeDotsVertical } from "react-icons/bs";

interface Person {
  firstname?: string;
  lastname?: string;
}

interface CardContents {
  title?: string;
  image?: string;
  time?: string;
  person?: Person;
  content?: string;
}

type CardContextType = {
  card?: CardContents;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

function useCardContext() {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCardContext must be used within a Card component");
  }
  return context;
}

type CardProps = PropsWithChildren & {
  onClick?: () => void;
  className?: string;
  card?: CardContents;
};

export const Card = ({ onClick, className, card, children }: CardProps) => {
  return (
    <CardContext.Provider value={{ card }}>
      <div
        className={twMerge(
          "w-full flex flex-col gap-3 p-5 rounded-lg dark:bg-black shadow-neumorphic-light dark:shadow-neumorphic-dark hover:shadow-neumorphic-light-pressed dark:hover:shadow-neumorphic-dark-pressed relative",
          className
        )}
        onClick={onClick}
      >
        {children}
      </div>
    </CardContext.Provider>
  );
};

Card.Image = function CardImage({ className }: { className?: string }) {
  const { card } = useCardContext();
  if (!card?.image) return null;
  return (
    <img
      src={card.image}
      alt={card.title || card.person?.firstname || "Card image"}
      className={twMerge(
        "size-20 object-contain self-center shadow-neumorphic-light dark:shadow-neumorphic-dark",
        className
      )}
    />
  );
};

Card.Title = function CardTitle({
  className,
  style,
}: {
  className?: string;
  style?: any;
}) {
  const { card } = useCardContext();
  if (!card?.title) return null;
  return (
    <h1
      className={twMerge(
        "text-2xl font-bold text-black dark:text-white",
        className
      )}
      style={style}
    >
      {card.title}
    </h1>
  );
};

Card.Person = function CardPerson({ className }: { className?: string }) {
  const { card } = useCardContext();
  if (!card?.person?.firstname && !card?.person?.lastname) return null;
  return (
    <h1
      className={twMerge(
        "text-lg font-bold text-black dark:text-white",
        className
      )}
    >
      {card.person?.firstname} {card.person?.lastname}
    </h1>
  );
};

Card.Content = function CardContent({ className }: { className?: string }) {
  const { card } = useCardContext();
  if (!card?.content) return null;
  return (
    <p className={twMerge("text-black dark:text-white", className)}>
      {card.content}
    </p>
  );
};

Card.Time = function CardTime({ className }: { className?: string }) {
  const { card } = useCardContext();
  if (!card?.time) return null;
  return (
    <p className={twMerge("text-xs text-neutral", className)}>{card.time}</p>
  );
};

Card.KebabMenu = Object.assign(
  function CardKebabMenu({
    className,
    children,
  }: {
    className?: string;
    children?: ReactNode;
  }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsOpen((prev) => !prev);
    };

    return (
      <div
        className={twMerge(
          "p-3 rounded-lg shadow-neumorphic-light dark:shadow-neumorphic-dark flex items-center hover:shadow-neumorphic-light-pressed dark:hover:shadow-neumorphic-dark-pressed cursor-pointer",
          className
        )}
        onClick={toggleMenu}
      >
        <button className="text-black dark:text-white" aria-label="Menu">
          <BsThreeDotsVertical className="text-xl" />
        </button>

        {isOpen && (
          <div className="absolute right-5 top-20 w-fit bg-white dark:bg-black rounded-lg shadow-neumorphic-light dark:shadow-neumorphic-dark">
            <ul className=" text-black dark:text-white space-y-1 p-3 text-center">
              {children}
            </ul>
          </div>
        )}
      </div>
    );
  },
  {
    Item: function CardKebabMenuItem({
      onClick,
      className,
      children,
    }: {
      onClick?: () => void;
      className?: string;
      children?: ReactNode;
    }) {
      return (
        <li
          onClick={onClick}
          className={twMerge(
            "flex items-center gap-3 p-2 cursor-pointer hover:bg-black/50 dark:hover:bg-white/25 shadow-neumorphic-light dark:shadow-neumorphic-dark hover:shadow-neumorphic-light-pressed dark:hover:shadow-neumorphic-dark-pressed",
            className
          )}
        >
          {children}
        </li>
      );
    },
  }
);

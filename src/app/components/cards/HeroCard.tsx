import { createContext, PropsWithChildren, useContext } from "react";
import { twMerge } from "tailwind-merge";

type HeroCardContext = {
  heroCard?: HeroCardContents;
};

const HeroCardContext = createContext<HeroCardContext | undefined>(undefined);

function useHeroCardContext() {
  const context = useContext(HeroCardContext);
  if (!context) {
    throw new Error("useHeroCardContext must be used within a card");
  }
  return context;
}

interface HeroCardContents {
  image?: string;
  name?: string;
  role?: string;
  skill?: {
    image: string;
    name: string;
    type: string;
    description: string;
  }[];
}

type HeroCardProps = PropsWithChildren & {
  onClick?: () => void;
  className?: string;
  heroCard?: HeroCardContents;
};

const HeroCard = ({ className, heroCard, children }: HeroCardProps) => {
  return (
    <HeroCardContext.Provider value={{ heroCard }}>
      <div
        className={twMerge(
          "w-fit bg-secondary space-y-2 rounded-xl shadow-md",
          className
        )}
      >
        {children}
      </div>
    </HeroCardContext.Provider>
  );
};

export default HeroCard;

HeroCard.Image = function HeroCardImage({ className }: { className?: string }) {
  const { heroCard } = useHeroCardContext();
  return (
    <img
      src={heroCard?.image}
      alt={heroCard?.name}
      className={twMerge(
        "w-full h-48 object-cover self-center shadow-neumorphic-light dark:shadow-neumorphic-dark",
        className
      )}
    />
  );
};

HeroCard.Name = function HeroCardName({ className }: { className?: string }) {
  const { heroCard } = useHeroCardContext();
  return (
    <div
      className={twMerge(
        "rounded-xl mx-2 font-bold text-black dark:text-white",
        className
      )}
    >
      <h1>{heroCard?.name}</h1>
    </div>
  );
};

HeroCard.Role = function HeroCardRole({ className }: { className?: string }) {
  const { heroCard } = useHeroCardContext();
  return (
    <div
      className={twMerge(
        "rounded-xl mx-2 font-bold text-black dark:text-white",
        className
      )}
    >
      <h1>{heroCard?.role}</h1>
    </div>
  );
};

HeroCard.Skill = function HeroCardSkill({ className }: { className?: string }) {
  const { heroCard } = useHeroCardContext();

  if (!heroCard?.skill || heroCard.skill.length === 0) {
    return <div>No skills available</div>;
  }

  return (
    <div
      className={twMerge(
        "mx-2 p-2 border rounded-xl space-y-3 bg-gray-500",
        className
      )}
    >
      <h1 className="text-sm font-bold">Skills:</h1>
      <div className="space-y-3">
        {heroCard.skill.map((skill, index) => (
          <div key={index} className="flex gap-3">
            <img
              src={skill.image}
              alt={skill.name}
              className="size-7 rounded-full border p-1"
            />
            <p className="flex flex-col text-gray-700 text-xs">
              <span className="font-bold text-black">{skill.name}:</span>
              {skill.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

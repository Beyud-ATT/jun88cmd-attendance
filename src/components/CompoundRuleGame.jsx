import { ModalProvider } from "./CompondModal";
import RulesGame from "./modal/rulesGame";
import { useModal } from "./CompondModal";

function CompoundRuleGameTrigger() {
  const { openModal } = useModal();

  return (
    <ModalProvider.Trigger>
      <button
        onClick={openModal}
        className="w-[355px] h-[43px] scale-100 hover:scale-105 transform transition-all duration-300 cursor-pointer px-3.5"
        style={{
          borderRadius: "21.495px",
          border: "1.624px solid #FFE83E",
          background:
            "linear-gradient(180deg, #FFD5D5 0%, #FFB8B8 17.79%, #C53A3A 37.98%, #F00 88.46%, #FF7171 100%)",
          boxShadow: "2.624px 3.498px 3.848px 0px rgba(0, 0, 0, 0.25) inset",
        }}
      >
        <span className="text-white font-bold uppercase text-center">
          Thể lệ trò chơi
        </span>
      </button>
    </ModalProvider.Trigger>
  );
}

export default function CompoundRuleGame() {
  return (
    <ModalProvider>
      <CompoundRuleGameTrigger />
      <ModalProvider.Content
        render={(open, closeModal) => (
          <RulesGame isOpen={open} onClose={closeModal} />
        )}
      />
    </ModalProvider>
  );
}

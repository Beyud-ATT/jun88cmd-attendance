import { ModalProvider } from "./CompondModal";
import WelcomeModal from "./WelcomeModal";

export default function CompoundWelcomeModal() {
  return (
    <ModalProvider>
      <ModalProvider.Trigger>
        <button
          id="compoundWelcomeModal"
          className="bg-[var(--primary-color)] text-white px-4 py-2 rounded hidden invisible opacity-0"
        >
          Open Modal
        </button>
      </ModalProvider.Trigger>
      <ModalProvider.Content
        render={(open, closeModal) => (
          <WelcomeModal
            isOpen={open}
            onClose={() => {
              closeModal();
            }}
          />
        )}
      />
    </ModalProvider>
  );
}

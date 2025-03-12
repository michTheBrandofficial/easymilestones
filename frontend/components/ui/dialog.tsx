import { Button } from "@/components/buttons";
import { Typography } from "@/components/typography";
import Modal from "@/components/ui/modal";

type Props = {
  open: boolean;
  onClose: () => void;
  action: {
    title?: string
    onConfirm: () => void;
  }
  title: string;
  description?: string;
};

/**
 * @dev dialog is just a modal with a title, description, confirm and cancel button, the onConfirm function is called when the confirm button is clicked and should (in the implementation) close the dialog
 */
const Dialog = (props: Props) => {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Modal.Body
        className={`min-h-fit max-w-[360px] h-fit w-fit flex px-8 py-8 flex-col gap-y-1.5 items-center justify-center rounded-[32px] bg-white `}
      >
        <div className="w-full flex justify-between items-center">
          <Typography variant={"h4"} className="font-bold text-black">
            {props.title}
          </Typography>
        </div>
        <Typography className="font-bold text-gray-400">
          {props.description || 'Are you sure you want to take this action?'}
        </Typography>
        <div className="w-full flex justify-between items-center mt-6">
          <Button onTap={props.onClose} variant="ghost" className="w-full">
            Cancel
          </Button>
          <Button onTap={props.action.onConfirm} className="w-full" variant="full">
            {props.action.title || 'Confirm'}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Dialog;

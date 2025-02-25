import { DialogContent, DialogDescription } from '@radix-ui/react-dialog';
import { Dialog, DialogHeader } from '../ui/dialog'
import { useCurrentColor } from '../../hooks';
import classNames from 'classnames';
import { X } from 'lucide-react';

const theme = useCurrentColor();


const PopularModal = ({isOpen, handleOpen}: {isOpen:boolean,handleOpen:() => void}) => {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleOpen}>
        <DialogContent className={theme.bg}>
          <DialogHeader className="font-bold">
          </DialogHeader>
          <button onClick={() => handleOpen()}>
            <X
              className={classNames(
                theme.text,
                "w-6 h-6 absolute top-4 right-4"
              )}
            />
          </button>
          <DialogDescription className="hidden">s</DialogDescription>
  
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PopularModal
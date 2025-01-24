import React from 'react';
import { Card } from '@/components/ui/card';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Score } from '../types/scorecard.types';
import { Modal, ModalContent, ModalHeader, ModalBackdrop, ModalCloseButton, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Button, ButtonText } from '@/components/ui/button';
import { Icon, CloseIcon, ChevronDownIcon } from '@/components/ui/icon';
import { VStack } from '@/components/ui/vstack';
import { Select, SelectTrigger, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem, SelectInput, SelectIcon } from '@/components/ui/select';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';

interface AddScoreModalProps {
  scorecard: Score[];
  hole: number;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddScoreModal: React.FC<AddScoreModalProps> = ({ scorecard, hole, showModal, setShowModal }) => {

  return (
    <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
        }}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-typography-950">
              Hole {hole}
            </Heading>
            <ModalCloseButton>
              <Icon
                as={CloseIcon}
                size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <VStack>
                {
                    scorecard.map((score, index) => {
                        const golfer = score.golfer;
                        return (
                            <HStack key={index} className="py-2 flex-1 justify-between items-center w-full">
                                <Text style={{ fontSize: 12 }} className="flex-0 mr-2">{golfer === null ? `Golfer ${index + 1}` : golfer.name}</Text>
                                <Input
                                    variant="outline"
                                    size="md"
                                    isDisabled={false}
                                    isInvalid={false}
                                    isReadOnly={false}
                                    className="flex-1"
                                    >
                                    <InputField placeholder="Score..." />
                                </Input>
                            </HStack>
                        )
                    })
                }
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              action="secondary"
              onPress={() => {
                setShowModal(false)
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              onPress={() => {
                setShowModal(false)
              }}
            >
              <ButtonText>Submit</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  );
};

export default AddScoreModal;

import React, { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Score } from '../types/scorecard.types';
import { Modal, ModalContent, ModalHeader, ModalBackdrop, ModalCloseButton, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Button, ButtonText } from '@/components/ui/button';
import { Icon, CloseIcon } from '@/components/ui/icon';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';

interface AddScoreModalProps {
  scorecard: Score[];
  hole: number;
  showModal: boolean;
  onCloseModal: () => void;
  onSaveScores: (updatedScorecard: Score[]) => void; // Callback to save the updated scorecard
}

const AddScoreModal: React.FC<AddScoreModalProps> = ({ scorecard, hole, showModal, onCloseModal, onSaveScores }) => {
  // State to store input scores for each golfer
  const [inputScores, setInputScores] = useState<string[]>(() =>
    scorecard.map((entry) => {
        const scoreForHole = entry.score[hole - 1] ?? ''; // Get the value at the specified "hole" index or default to an empty string
        return scoreForHole.toString(); // Convert the score to a string
      })
  );

  // Handle score input changes
  const handleInputChange = (index: number, value: string) => {
    const updatedScores = [...inputScores];
    updatedScores[index] = value;
    setInputScores(updatedScores);
  };

  // Handle Submit button
  const handleSubmit = () => {
    const updatedScorecard = scorecard.map((score, index) => {
      const newScore = parseInt(inputScores[index], 10);
      if (!isNaN(newScore)) {
        const updatedScores = [...score.score];
        updatedScores[hole - 1] = newScore;
        // Update the score for the specified hole
        return {
            ...score,
            score: updatedScores
          };
      }
      return score;
    });

    // Pass the updated scorecard back to the parent
    onSaveScores(updatedScorecard);

    // Close the modal
    onCloseModal();
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={onCloseModal}
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
            {scorecard.map((score, index) => {
              const golfer = score.golfer;
              return (
                <HStack key={index} className="py-2 flex-1 justify-between items-center w-full">
                  <Text style={{ fontSize: 12 }} className="flex-0 mr-2">
                    {golfer === null ? `Golfer ${index + 1}` : golfer.displayName}
                  </Text>
                  <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    className="flex-1"
                  >
                    <InputField
                      placeholder="Score..."
                      value={inputScores[index]}
                      onChangeText={(text) => handleInputChange(index, text)}
                    />
                  </Input>
                </HStack>
              );
            })}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            action="secondary"
            onPress={onCloseModal}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button onPress={handleSubmit}>
            <ButtonText>Submit</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddScoreModal;

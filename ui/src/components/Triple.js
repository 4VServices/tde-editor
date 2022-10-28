import { useCallback } from 'react';
import { Group } from './Group';
import { TextEdit } from './TextEdit';

const Triple = ({ triple, index: tripleIndex, onTripleChange, onTripleDelete, extractedData }) => {
  const handleTripleChange = useCallback(
    (index, key, value) => {
      onTripleChange(index, {
        ...triple,
        [key]: { val: value }
      });
    },
    [triple, onTripleChange]
  );

  return (
    <Group title={`Triple ${tripleIndex + 1}`}>
      <TextEdit
        label="Subject"
        value={triple.subject.val}
        onChange={(val) => handleTripleChange(tripleIndex, 'subject', val)}
      />

      <TextEdit
        label="Predicate"
        value={triple.predicate.val}
        onChange={(val) => handleTripleChange(tripleIndex, 'predicate', val)}
      />

      <TextEdit
        label="Object"
        value={triple.object.val}
        onChange={(val) => handleTripleChange(tripleIndex, 'object', val)}
      />
    </Group>
  );
};

export default Triple;

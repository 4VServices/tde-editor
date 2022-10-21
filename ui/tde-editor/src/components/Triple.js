import { Group } from './Group';
import { TextEdit } from './TextEdit';

const Triple = ({ triple, index: tripleIndex, onTripleChange, onTripleDelete, extractedData }) => {
  return (
    <Group title={`Triple ${tripleIndex + 1}`}>
      <TextEdit
        label="Subject"
        value={triple.subject.val}
        // onChangeDebounced={(v) => handleColumnChange(columnIndex, 'val', v)}
      />

      <TextEdit
        label="Predicate"
        value={triple.predicate.val}
        // onChangeDebounced={(v) => handleColumnChange(columnIndex, 'val', v)}
      />

      <TextEdit
        label="Object"
        value={triple.object.val}
        // onChangeDebounced={(v) => handleColumnChange(columnIndex, 'val', v)}
      />
    </Group>
  );
};

export default Triple;

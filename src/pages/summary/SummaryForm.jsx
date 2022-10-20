import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function SummaryForm() {
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const termsandCondition = (
    <span>
      I agree to <span style={{ color: 'blue' }}> Terms and Conditions</span>
    </span>
  );
  return (
    <Form>
      <Form.Group className="mb-3" controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          label={termsandCondition}
          checked={checkboxChecked}
          onChange={(e) => setCheckboxChecked(e.target.checked)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!checkboxChecked}>
        Confirm order
      </Button>
    </Form>
  );
}

import React, { useState } from 'react';
import { Button, Form, OverlayTrigger, Popover } from 'react-bootstrap';

export default function SummaryForm() {
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const termsandConditionLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: 'blue' }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );
  return (
    <Form>
      <Form.Group className="mb-3" controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          label={termsandConditionLabel}
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

import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field/field";
import Select from "../../components/Select/select";
import Button, { BUTTON_TYPES } from "../../components/Button/button";
// import React, { useState } from "react";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        onSuccess()
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
           {/* data-testid="button-test-id"> */}
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

// const Form = ({ onSuccess }) => {
//   const [status, setStatus] = useState("Envoyer");

//   const handleSubmit = () => {
//     setStatus("En cours");
//     setTimeout(() => {
//       setStatus("Envoyer");
//       if (onSuccess) {
//         onSuccess();
//       }
//     }, 1000);
//   };

//   return (
//     <div>
//       <button data-testid="button-test-id" onClick={handleSubmit}>
//         {status}
//       </button>
//     </div>
//   );
// };

export default Form;

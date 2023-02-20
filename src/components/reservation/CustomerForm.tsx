import { ChangeEvent, useState } from "react";
import cn from "classnames";

import Input from "@components/common/Input";
import InputForm from "@components/common/InputForm";
import InputPeopleNumber from "@components/common/InputPeopleNumber";
import { validUsername, validEmail } from "src/utils/regEx";

function CustomerForm() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [requestedTerm, setRequestedTerm] = useState<string>("");

  const handleTextAreaInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setRequestedTerm(value);
  };

  return (
    <div className={cn("customer-form-wrap")}>
      <Input
        title="이름"
        regEx={validUsername}
        placeholder="이름을 입력해주세요"
        inputValue={username}
        setInputValue={setUsername}
        errorText="영문이나 한글로만 작성해주세요."
      />
      <Input
        title="이메일"
        regEx={validEmail}
        placeholder="이메일을 입력해주세요"
        inputValue={email}
        setInputValue={setEmail}
        errorText="올바른 이메일 양식으로 작성해주세요."
      />
      <InputForm title="연락처">
        <button type="button" className={cn("certification-button")}>
          인증하기 (TBD)
        </button>
      </InputForm>
      <InputForm title="인원">
        <InputPeopleNumber />
      </InputForm>
      <InputForm title="요청사항">
        <div className={cn("text-area-wrap")}>
          <textarea
            cols={5}
            rows={4}
            maxLength={200}
            placeholder="요청사항을 적어주세요. (최대 200자)"
            className={cn("input-text-area")}
            value={requestedTerm}
            onChange={(e) => handleTextAreaInput(e)}
            wrap="on"
          />
          <span className={cn("text-count")}>{requestedTerm.length}/200</span>
        </div>
      </InputForm>
    </div>
  );
}

export default CustomerForm;

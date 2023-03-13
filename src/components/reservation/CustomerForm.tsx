import { ChangeEvent, useEffect, useState } from "react";
import cn from "classnames";

import Input from "@components/common/Input";
import InputForm from "@components/common/InputForm";
import InputPeopleNumber from "@components/common/InputPeopleNumber";
import { validUsername, validEmail, validUserMobileNumber } from "src/utils/regEx";
import axios from "axios";
import Timer from "./Timer";

interface CustomerFormProps {
  setCanReserve: (canReserve: boolean) => void;
}

function CustomerForm({ setCanReserve }: CustomerFormProps) {
  const [username, setUsername] = useState<string>("");
  const [userMobileNumber, setUserMobileNumber] = useState<string>("");
  const [userAuthNumber, setUserAuthNumber] = useState<string>("");
  const [authResultMsg, setAuthResultMsg] = useState<string>("");
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [requestedTerm, setRequestedTerm] = useState<string>("");
  const [isBtnFocused, setIsBtnFocused] = useState<boolean>(false);

  const handleTextAreaInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setRequestedTerm(value);
  };
  const handleAuthNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserAuthNumber(value);
  };

  useEffect(() => {
    if (!validUsername.test(username)) return;
    if (!validUserMobileNumber.test(userMobileNumber)) return;
    if (!validEmail.test(email)) return;
    if (!isAuthorized) return;
    setCanReserve(true);
  }, [username, userMobileNumber, email, isAuthorized, setCanReserve]);

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
        {isBtnFocused ? (
          <div style={{ display: "flex" }}>
            <Input
              title=""
              regEx={validUserMobileNumber}
              placeholder=""
              inputValue={userMobileNumber}
              setInputValue={setUserMobileNumber}
              errorText=""
              classnames="user-mobile-input disabled"
              disabled
            />

            <div className={cn("user-auth-number-wrap")}>
              <input
                disabled={isAuthorized}
                value={userAuthNumber}
                onChange={(e) => handleAuthNumber(e)}
                placeholder="인증번호"
                maxLength={6}
              />
              {!isAuthorized && (
                <Timer setAuthResultMsg={setAuthResultMsg} isAuthorized={isAuthorized} setIsTimeOut={setIsTimeOut} />
              )}
            </div>
            {/* </span> */}
            <button
              // 인증되지않거나, 시간만료, 인증번호를 치지않은 경우 비활성화
              disabled={isAuthorized || isTimeOut || userAuthNumber.length === 0}
              type="button"
              className={cn("certification-check-button")}
              onClick={() => {
                setIsBtnFocused(true);
                axios
                  .get(`http://3.35.98.5:8080/reservation/sms/authKey/${userMobileNumber}/${userAuthNumber}`)
                  .then((res) => {
                    if (res.data) {
                      setIsAuthorized(true);
                      setAuthResultMsg("인증이 성공적으로 완료되었습니다.");
                    } else if (res.data === false) {
                      setAuthResultMsg("인증번호가 올바르지 않습니다.");
                    }
                  })
                  .catch((err) => {
                    console.log("인증번호에러", err);
                    setAuthResultMsg("인증도중 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
                  });
              }}
            >
              인증확인
            </button>
            <span>{authResultMsg}</span>
          </div>
        ) : (
          <div>
            <Input
              title=""
              regEx={validUserMobileNumber}
              placeholder="000-0000-0000 형식으로 작성해주세요."
              inputValue={userMobileNumber}
              setInputValue={setUserMobileNumber}
              errorText="번호가 올바르지 않습니다. 000-0000-0000 형식으로 작성해주세요."
              classnames="user-mobile-input"
              maxLength={13}
            />
            <button
              type="button"
              className={cn("certification-button")}
              onClick={() => {
                // const isValid = validUserMobileNumber.test(userMobileNumber);
                // if (isValid) {
                // }
                setIsBtnFocused(true);
                // console.log(userMobileNumber);
                axios
                  .get(`http://3.35.98.5:8080/reservation/sms/authKey/${userMobileNumber}`)
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err));
              }}
              disabled={!validUserMobileNumber.test(userMobileNumber)}
            >
              인증번호요청 (TBD)
            </button>
          </div>
        )}
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

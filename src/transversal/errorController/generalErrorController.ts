import log from "loglevel";
import t from "../language/i18";

const colors = {
  red: `\u001b[1;31m`,
  green: `\u001b[1;32m`,
  yellow: `\u001b[1;33m`,
  blue: `\u001b[1;34m`,
  purple: `\u001b[1;35m`,
  cyan: `\u001b[1;36m`,
};

function findMessage(errorMessage: string, row?: string, column?: string) {
  let translation;
  //si mantenemos que los mensajes de error sean los del archivo typeErrors, podemos sustituir el switch por: let translation = t(errorMessage)

  switch (errorMessage) {
    case "_01_LoginFeedbackErrorConsole":
      translation = t("_01_LoginFeedbackErrorConsole");
      break;
    case "_01_LoginFeedbackInvalidPassword":
      translation = t("_01_LoginFeedbackInvalidPassword");
      break;
    case "_01_LoginFeedbackInvalidUser":
      translation = t("_01_LoginFeedbackInvalidUser");
      break;
    case "_02_ImportFeedbackError":
      translation = `${t("_02_ImportFeedbackError")} ${t(
        "_02_ImportRow"
      )}: ${row} ${t("_02_ImportColumn")}: ${column}`;
      break;
    case "_04_AuthError":
      translation = t("_04_AuthError");
      break;
    default:
      translation = errorMessage;
  }
  return translation;
}

export function consoleError(
  typeError: string,
  nameFunction: string,
  error: Error,
  callstack = ""
) {
  // El código anterior era:
  // const date = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
  // Se sustituye porque SonarCloud considera "is vulnerable to super-linear runtime due to backtracking, cannot lead to denial of service". Comprobar que funcione de la misma forma.

  const date = new Date().toTimeString();
  const regex = /(\d{2}:\d{2}:\d{2})/;
  const hour = regex.exec(date)?.[1];

  log.setLevel(log.levels.TRACE);

  if (typeError.toUpperCase() === "ERROR") {
    log.info(
      colors.red,
      hour +
        " [ERROR] " +
        nameFunction +
        ": " +
        JSON.stringify(error) +
        " " +
        callstack
    );
  }

  const level = import.meta.env.REACT_APP_CONSOLE_LOG_VISUALIZE_LEVEL;

  if (
    level.toUpperCase() === "TRACE" ||
    level.toUpperCase().includes(typeError.toUpperCase()) === true
  ) {
    if (typeError.toUpperCase() === "DEBUG") {
      log.info(
        colors.yellow,
        hour +
          " [DEBUG] " +
          nameFunction +
          ": " +
          JSON.stringify(error) +
          " " +
          callstack
      );
    }

    if (typeError.toUpperCase() === "INFO") {
      log.info(
        colors.green,
        hour +
          " [INFO] " +
          nameFunction +
          ": " +
          JSON.stringify(error) +
          " " +
          callstack
      );
    }
    if (typeError.toUpperCase() === "WARN") {
      log.info(
        colors.red,
        hour +
          " [WARN] " +
          nameFunction +
          ": " +
          JSON.stringify(error) +
          " " +
          callstack
      );
    }
  }

  return undefined;
}

export function errorController(
  nameFunction: string,
  error: Error,
  callstack: string,
  row?: string,
  column?: string
) {
  consoleError("ERROR", nameFunction, error, callstack);

  return findMessage(error.message, row, column);
}

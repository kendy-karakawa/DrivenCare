import httpStatus from "http-status";

export default function handleApplicationErrors(err, req, res, next) {
    if (err.name === "Conflict" || err.name === "DuplicatedEmail") {
        return res
          .status(httpStatus.CONFLICT)
          .send({ message: err.message });
      }
    
      if (err.name === "InvalidCredentials") {
        return res.status(httpStatus.UNAUTHORIZED).send({
          message: err.message,
        });
      }
    
      if (err.name === "Unauthorized") {
        return res.status(httpStatus.UNAUTHORIZED).send({
          message: err.message,
        });
      }
    
      if (err.name === "NotFound") {
        return res.status(httpStatus.NOT_FOUND).send({
          message: err.message,
        });
      }
    
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: "InternalServerError",
        message: "Internal Server Error",
      });
}



module.exports = {
  getErrorByStatus,
  getSuccessByStatus
}

function getErrorByStatus(status, msg) {
  const list = {
    500: {
      hasError: true,
      status: 500,
      msg: msg || "Internal server error!" 
    },
    404: {
      hasError: true,
      status: 404,
      msg: msg || "Not found!" 
    },
    403: {
      hasError: true,
      status: 403,
      msg: msg || "Forbidden!" 
    },
    400: {
      hasError: true,
      status: 400,
      msg: msg || "Bad Request!" 
    },
  }
  return list[status] ? list[status] : null;
}

function getSuccessByStatus(status, msg) {
  const list = {
    200: {
      hasError: false,
      status: 200,
      msg: msg || "Success!" 
    },
    201: {
      hasError: false,
      status: 201,
      msg: msg || "Created!" 
    },
  }
  return list[status] ? list[status] : null;
}
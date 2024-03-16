class ApiResponse{
    constructor(
        statusCode,s
        data,
        message="success"
    ){
       this.statusCode=statusCode;
       this.data=data
       this.message=message
       this.success= statusCode < 400
    }
}
export{ ApiResponse }
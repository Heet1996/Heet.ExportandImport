
function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    
    return (false)
}

function ValidateDate(date)
{

return isNaN(date) && moment(date, ["DD-MM-YYYY", "D-MM-YYYY", "DD-M-YYYY","D-M-YYYY"],true).isValid();

}
function fetchData(){
      fetch('https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2')
        .then((response) => {
          console.log(response)
          if(!response.ok){
            throw Error('ERROR');
          }
          return response.json();
        })
        .then((data) => {
          // Work with JSON data here
          console.log(data.transactions);
          res = data.transactions;
          const html = data.transactions
                  .map(user => {

                  if(user.direction == 1){
                    if(user.status == 2){
                      return `
                          <div class="user">
                            <div  class="box">
                            
                            <div class="amount">
                                  ₹${user.amount}<br><br>
                                  
                             </div>  
                             <div style="font-size: 16px;
                             left: 38rem;
                             position: absolute;
                             top: 154px;"><br>
                             Transaction ID<br>
                             ${user.id}
                         </div> 
                            <div class="status">   <div style="float:right;">  You paid</div></div><br>
                            
                          
                            </div><br>

                            
                            
                          </div>
                          `;
                    }
                    else{
                      return `
                        <div class="user">
                          <div  class="box">
                          <div class="amount">₹${user.amount}</div>   
                          <div class="status"> <div style="float:left;"> You requested  </div></div><br>
                          <div class="option" > <button style="width: 6rem;"> cancel </button></div>
                          </div><br>
                        </div>
                        `;
                    }
                    
                  }
                  else{
                    if(user.status == 2){
                      return `
                          <div class="user">
                            <div  class="box2">
                            <div class="amount">₹${user.amount}</div>   
                            <div class="status"> <div style="float:left;">  You received </div></div><br>
                            </div><br>
                          
                          </div>
                          `;
                    }
                    else{
                      return `
                          <div class="user">
                            <div  class="box2">
                            <div class="amount">₹${user.amount}</div>   
                            <div class="status"> <div style="float:left;">  Request received </div></div><br>
                           <div style="    flex: none;
                           position: absolute;
                           left: 5rem;
                           top: 44rem;">
                            <button style="height: 20px; margin-right: 1rem;"> Pay </button>  <button style="height: 20px; width:8rem"> Decline </button>
                            </div>
                            </div><br>
                      
                          `;
                    }
                    
                  }
                  })
                  .join("");
          document.querySelector("#body").insertAdjacentHTML("afterbegin",html);
        })
        .catch((err) => {
          // Do something for an error here
          console.log(err);
        })
}

fetchData()



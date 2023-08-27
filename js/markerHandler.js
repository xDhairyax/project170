AFRAME.registerComponent("markerhandler", {
    init: async function() {
        var toys=await this.getToys()

      this.el.addEventListener("markerFound", () => {
        markerId=this.el.id
        console.log("marker is found");
        this.handleMarkerFound(toys,markerId);
      });
  
      this.el.addEventListener("markerLost", () => {
        console.log("marker is lost");
        this.handleMarkerLost();
      });
    },
    handleMarkerFound: function(toys,markerId) {
      var buttonDiv = document.getElementById("button-div");
      buttonDiv.style.display = "flex";
  
      var orderButtton = document.getElementById("order-button");
      var orderSummaryButtton = document.getElementById("order-summary-button");

      orderSummaryButtton.addEventListener("click", () => {
        swal({
          icon: "warning",
          title: "Order Summary",
          text: "Work In Progress"
        });
      });

      orderButtton.addEventListener("click", () => {
        swal({
            icon: "https://i.imgur.com/4NZ6uLY.jpg",
            title: "Thanks For Order !",
            text: "  ",
            timer: 2000,
            buttons: false
        });
      });

      var toy=toys.filter(toy=>toy.id===markerId)

      var model=document.querySelector(`#model-${toy.id}`)
      model.setAttribute("position",toy.model_geometry.position)
      model.setAttribute("rotation",toy.model_geometry.rotation)
      model.setAttribute("scale",toy.model_geometry.scale)

    },

    getToys:async function(){
        return await firebase
        .firestore()
        .collection()
        .get()
        .then(snap=>{
            return snap.docs.map(doc=>doc.data())
        })
    },

    
  
    handleMarkerLost: function() {
      // Changing button div visibility
      var buttonDiv = document.getElementById("button-div");
      buttonDiv.style.display = "none";
    }
  });
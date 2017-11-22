({
    scriptsLoaded : function(component, event, helper) {

        var datasets = [
            {
                label: 'Positive', 
                data: [85, 87, 89, 88, 92, 94, 90, 93, 96, 91, 94, 98],
                fill: false,
                borderWidth: 1.5,
                backgroundColor: '#89C059',
                borderColor: '#89C059',
                pointBackgroundColor: "#FFFFFF",
                pointBorderWidth: 4,
                pointHoverRadius: 8,
                pointRadius: 6,
                pointHitRadius: 10,
            },  
            {
                label: 'Neutral', 
                data: [15, 17, 20, 18, 24, 12, 17, 16, 11, 22, 26, 14],
                fill: false,
                borderWidth: 1.5,
                backgroundColor: '#00A1E0',
                borderColor: '#00A1E0',
                pointBackgroundColor: "#FFFFFF",
                pointBorderWidth: 4,
                pointHoverRadius: 8,
                pointRadius: 6,
                pointHitRadius: 10,
            },  
            {
                label: 'Negative', 
                data: [.5, 1, 2, 1, .5, .2, .4, .5, 0, .6, .3, .2],
                fill: false,
                borderWidth: 1.5,
                backgroundColor: '#C25454',
                borderColor: '#C25454',
                pointBackgroundColor: "#FFFFFF",
                pointBorderWidth: 4,
                pointHoverRadius: 8,
                pointRadius: 6,
                pointHitRadius: 10,
            },  
        ];
            
            
            var ctx = component.find("chart").getElement();
            var chart = new Chart(ctx, {
            type: 'line',
            data: {
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: datasets
    },
    options: {
        responsive: true,
        maintainAspectRatio :false,
        onClick: function(event) {
        }
    }
});

}
})
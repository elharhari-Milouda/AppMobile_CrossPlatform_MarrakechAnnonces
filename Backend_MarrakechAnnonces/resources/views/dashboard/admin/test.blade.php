@extends('dashboard.layout.app')

@section('content')
    this is map section
    <div class="container mt-5">
        <div class="mb-3 col-md-6">
            <label for="language" class="form-label">Select Driver</label>
            <select onchange="myFunction(this.options[this.selectedIndex].value)" id="language"
                    class="select2 form-select">
                <option value="">Select phone Driver</option>
                <option value="1">066</option>

            </select>
        </div>

        <div id="map"></div>
    </div>

    <script type="text/javascript">
        function myFunction(chosen) {
            $.ajax({
                url: '{{ url('http://192.168.1.6:8000/admin/upmap') }}',
                type: "GET",
                dataType: "json",
                success:function(data) {
                    console.log(data);
                    //$('#totalPriceInTotal').empty();
                    //var shipingcost = parseFloat(data)+parseFloat(quantity);
                    //var shipingcostnumber = shipingcost;

                    //$('#totalPriceInTotal').append('Rp '+nf.format(shipingcostnumber)+'');
                }
            });
            //
        }

        function initMap() {
            let myLatLng = {lat: 31.630000, lng: -8.008889};
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 15,
                center: myLatLng,
            });

            new google.maps.Marker({
                position: myLatLng,
                map,
                title: "ggg",
            });

        }

        window.initMap = initMap;
    </script>

    <script type="text/javascript"
            src="https://maps.google.com/maps/api/js?key={{ env('GOOGLE_MAP_KEY') }}&callback=initMap"></script>

    </body>
@endsection

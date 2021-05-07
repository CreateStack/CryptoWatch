import json

places = []

with open('./app/config/constants.js') as filehandle:
   places = json.loads(filehandle.read())

print(len(places))
#places = list(filter(lambda place: place['volume_1day_usd']!=0 ,places))
#places = list(filter(lambda place: place['type_is_crypto']!=0 ,places))

for i in range(0,len(places)):
    places[i].pop('data_start', None)
    places[i].pop('data_end', None)
    places[i].pop('data_quote_start', None)
    places[i].pop('data_quote_end', None)
    places[i].pop('data_orderbook_start', None)
    places[i].pop('data_orderbook_end', None)
    places[i].pop('data_trade_start', None)
    places[i].pop('data_trade_end', None)
    places[i].pop('data_symbols_count', None)
    places[i].pop('volume_1hrs_usd', None)
    places[i].pop('volume_1day_usd', None)
    places[i].pop('volume_1mth_usd', None)
    places[i].pop('price_usd', None)
    places[i].pop('id_icon', None)
    if not "name" in places[i]:
        places[i]["name"]=places[i]["asset_id"]

with open('./app/config/constants.js','w') as filehandle:
    filehandle.write(json.dumps(places))


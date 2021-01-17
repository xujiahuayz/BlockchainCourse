import os
# run `pip install --upgrade google-cloud-bigquery` in the terminal first
from google.cloud import bigquery
from pandas import json_normalize

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "gcloud_jiahuaxu_key.json"
client = bigquery.Client()

# Perform a query.
query_btc = ("""
select *, (coinbase_value - daily_fee) as block_reward,
from (select
  extract(date from block_timestamp) as calendar_date,
  min(block_number) as starter_block,
  sum(input_value)/1e8 as daily_input,
  sum(output_value)/1e8 as daily_output,
  sum(case when is_coinbase then output_value end)/1e8 as coinbase_value,
  sum(fee)/1e8 as daily_fee,
  countif(is_coinbase) as coinbase_tx,
  sum(input_count) as input_counts,
  count(inputs) as number_inputs,
  count(*) as number_tx
from bigquery-public-data.crypto_bitcoin.transactions
group by calendar_date)
order by calendar_date;
""")

query_job = client.query(query_btc)  # API request
rows = query_job.result()  # Waits for query to finish


field_names = [f.name for f in rows.schema]
# needs to be done in once, otherwise 'Iterator has already started' error
btc_tx_value = [{
    field: row[field] for field in field_names
} for row in rows]

json_normalize(btc_tx_value)

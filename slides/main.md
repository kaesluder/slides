# Step 8 - Persistence

## Step 8 - Challenge: Persistence

In this step your goal is to make your Redis server persist its internal state 
to disk and to reload the state on startup.

For this step we will implement the AOF (Append Only File). In this mode the 
Redis server logs every operation received by the server to disk. 
These operations can then be replayed on startup to re-create the current 
status of the stored dataset.

The commands are logged in the same format as the Redis protocol itself.

```tsx
      
      <FlatList
        data={tasks}
        keyExtractor={(item) => item?._id}
       contentContainerStyle={{gap:20}}
        nestedScrollEnabled={true}
        renderItem={({ item }) => (
          <View style={styles.taskWrapper}>
            <Text style={styles.taskHeader}>{item.title}</Text>
            <Text style={styles.taskTitle}>{item.description}</Text>

            <View style={styles.taskField}>
              <Text style={styles.taskStatus}>In Progress</Text>
              <Image
                style={styles.taskPersonImg}
                source={{
                  uri: item?.assignedTo.profilePicture
                    ? item?.assignedTo.profilePicture
                    : "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                }}
              />
            </View>
          </View>
        )}
      /> 
```
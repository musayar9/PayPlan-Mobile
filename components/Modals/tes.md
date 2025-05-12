 {user?._id === taskDetail?.group.createdBy ? (
              <StatusBar status/>
              ) : taskDetail?.votes.vote  ? (
                <Text style={styles.cardText}>
                  Task has already been assigned to another user.
                </Text>
              ) : (
                <View style={[styles.cardLayout, { gap: 5 }]}>
                  <TouchableOpacity
                    style={[styles.btn, styles.btnSuccess]}
                    onPress={handleAssignTask}
                  >
                    <AntDesign
                      name="like1"
                      size={20}
                      color={Colors.background}
                    />
                    <Text style={styles.btnTxt}>I can do it</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btn, styles.btnError]}
                    onPress={() => setShowTask(false)}
                  >
                    <AntDesign
                      name="dislike1"
                      size={20}
                      color={Colors.background}
                    />
                    <Text style={styles.btnTxt}>I can't do it</Text>
                  </TouchableOpacity>
                </View>
              )}